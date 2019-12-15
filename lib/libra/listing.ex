defmodule Libra.Listing do
  use Ecto.Schema
  alias Libra.Users.User
  alias Libra.Book
  import Ecto.Changeset

  schema "listings" do
    field :description, :string
    field :price, :decimal
    belongs_to :user, User
    belongs_to :book, Book

    timestamps()
  end

  @doc false
  def changeset(listing, attrs) do
    listing
    |> cast(attrs, [:description, :price])
    |> validate_required([:description, :price])
    |> put_assoc(:user, attrs.user)
    |> put_assoc(:book, attrs.book)
  end
end
