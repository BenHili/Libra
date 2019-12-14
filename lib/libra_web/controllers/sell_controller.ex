defmodule LibraWeb.SellController do
  require Logger
  require HTTPoison

  alias Libra.Book
  use LibraWeb, :controller

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

  def new(conn, %{"id" => google_id}) do
    changeset = Book.changeset(%Book{}, %{google_id: google_id})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, _params) do
    changeset = Book.changeset(%Book{})
    Logger.info(_params)
  end
end
