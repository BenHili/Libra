defmodule LibraWeb.BuyController do
  use LibraWeb, :controller
  import Ecto.Query
  alias Libra.{Repo, Listing, Book}
  require Logger

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def buy(conn, %{"query" => query}) do
    listing_query = from l in Listing, join: b in Book, on: l.book_id == b.id, select: map(b, [:title, :image, :authors])

    books = Repo.all(listing_query)


    render(conn, "results.html", books: books)
  end
end
