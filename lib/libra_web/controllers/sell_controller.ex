defmodule LibraWeb.SellController do
  use LibraWeb, :controller
  alias Libra.{Listing, Repo, Book, OpenLibrary}
  require Logger

  def sell(conn, %{"query" => query}) do
    book_rec = Repo.get_by(Book, isbn_13: query)

    if !book_rec do
      ol_record = OpenLibrary.getByIsbn(query)

      new_book =
        Book.changeset(%Book{}, ol_record)
        |> Book.upsert()
        |> Map.from_struct()

      render(conn, "new.html",
        book: new_book,
        book_id: new_book.id,
        listing_changeset: Listing.changeset(%Listing{})
      )
    end

    render(conn, "new.html",
      book: Map.from_struct(book_rec),
      book_id: book_rec.id,
      listing_changeset: Listing.changeset(%Listing{})
    )
  end

  def create(conn, %{"listing" => listing}) do
    current_user = Pow.Plug.current_user(conn)

    Listing.changeset(%Listing{}, Map.put(listing, "user_id", current_user.id))
    |> Repo.insert!()

    render(conn, "results.html")
  end
end
