defmodule LibraWeb.SellController do
  require Logger

  # SO SICK!
  alias Libra.{Book, Listing, Repo, BookApi}

  alias Pow.Plug

  use LibraWeb, :controller

  def sell(conn, %{"query" => query}) do
    bookInfo = BookApi.getByTitle(query)
    render(conn, "results.html", books: bookInfo)
  end

  def new(conn, %{"id" => google_id}) do
    changeset = Book.changeset(%Book{}, %{google_id: google_id})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"book" => book}) do
    book_record =
      book["google_id"]
      |> BookApi.getById()
      |> Book.changeset(%Book{})
      |> Book.upsert()

    current_user = Pow.Plug.current_user(conn)

    listing_changeset =
      Listing.changeset(
        %Listing{},
        %{
          :user => current_user,
          :book => book_record,
          :description => book["description"],
          :price => book["price"]
        }
      )

    Logger.info(inspect(listing_changeset))
    Repo.insert(listing_changeset)
    render(conn, "results.html")
  end
end
