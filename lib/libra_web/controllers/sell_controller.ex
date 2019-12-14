defmodule LibraWeb.SellController do
  require Logger
  require HTTPoison

  alias Libra.Book
  alias Libra.Listing
  alias Libra.Repo
  alias Pow.Plug

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

  def create(conn, %{"book" => book}) do
    url = "https://www.googleapis.com/books/v1/volumes/#{book["google_id"]}"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        req = Poison.decode!(body)

        book_changeset =
          Book.changeset(%Book{}, %{
            :id => get_in(req, ["id"]),
            :title => get_in(req, ["volumeInfo", "title"]),
            :authors => get_in(req, ["volumeInfo", "authors"]),
            :image => get_in(req, ["volumeInfo", "imageLinks", "smallThumbnail"]),
            :page_count => get_in(req, ["volumeInfo", "pageCount"]),
            :description => get_in(req, ["volumeInfo", "description"]),
            :google_id => book["google_id"]
          })

        case Repo.insert_or_update(book_changeset) do
          {:ok, %Libra.Book{id: id, description: description}} ->
            listing_changeset =
              Listing.changeset(
                %Listing{},
                %{
                  :user_id => Pow.Plug.current_user(conn),
                  :book_id => id,
                  :description => description,
                  :price => book["price"]
                }
              )

            Repo.insert(listing_changeset)

            render(conn, "results.html")
        end

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        Logger.info("Not found :(")
        render(conn, "results.html")

      {:error, %HTTPoison.Error{reason: reason}} ->
        Logger.error(reason)
        render(conn, "error_view.html")
    end
  end
end
