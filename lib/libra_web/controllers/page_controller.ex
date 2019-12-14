defmodule LibraWeb.PageController do
  require Logger
  require HTTPoison

  use LibraWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def buy(conn, %{"query" => query}) do
    stubBooks = [
      %{
        :title => "Road to learn react",
        :image => "/images/road_to_learn_react.jpg",
        :description => "#{query}",
        :price => "$99.99"
      },
      %{
        :title => "Programming Phoenix 14",
        :image => "/images/programming_phoenix.jpg",
        :description => "Blah blah",
        :price => "Priceless"
      },
      %{
        :title => "Elixir In Action",
        :image => "/images/elixir_in_action.jpg",
        :description => "My boi",
        :price => "Priceless"
      }
    ]

    render(conn, "results.html", books: stubBooks)
  end

  def sell(conn, %{"query" => query}) do
    url = "https://www.googleapis.com/books/v1/volumes?q=intitle:#{URI.encode(query)}"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        req = Poison.decode!(body)

        cond do
          req["totalItems"] == 0 ->
            render(conn, "results.html")

          true ->
            bookInfo =
              Enum.map(req["items"], fn item ->
                %{
                  :id => get_in(item, ["id"]),
                  :title => get_in(item, ["volumeInfo", "title"]),
                  :image => get_in(item, ["volumeInfo", "imageLinks", "smallThumbnail"]),
                  :description => get_in(item, ["volumeInfo", "description"]),
                  :price => "99.99"
                }
              end)

            render(conn, "results.html", books: bookInfo)
        end

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        Logger.info("Not found :(")
        render(conn, "results.html")

      {:error, %HTTPoison.Error{reason: reason}} ->
        Logger.error(reason)
        render(conn, "error_view.html")
    end
  end

  def create(conn, %{"book" => book}) do
    url = "https://www.googleapis.com/books/v1/volumes/#{book}"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        item = Poison.decode!(body)

        bookInfo = %{
          :id => get_in(item, ["id"])
        }

        render(conn, "create.html", book: book)

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        Logger.info("Not found :(")
        render(conn, "index.html")

      {:error, %HTTPoison.Error{reason: reason}} ->
        Logger.error(reason)
        render(conn, "error_view.html")
    end
  end
end
