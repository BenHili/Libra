defmodule Libra.Listing do
  use Ecto.Schema
  alias Libra.{Repo, Book, Users.User}

  import Ecto.Changeset

  schema "listings" do
    field :description, :string
    field :price, :decimal
    belongs_to :user, User
    belongs_to :book, Book

    timestamps()
  end

  @doc false
  def changeset(listing, params \\ %{}) do
    listing
    |> cast(params, [:description, :price, :user_id, :book_id])
    |> validate_required([:description, :price, :user_id, :book_id])
  end

end
