defmodule Libra.Listing do
  use Ecto.Schema
  import Ecto.Changeset

  schema "listings" do
    field :description, :string
    field :price, :decimal
    field :user_id, :id
    field :book_id, :id

    timestamps()
  end

  @doc false
  def changeset(listing, attrs) do
    listing
    |> cast(attrs, [:description, :price])
    |> validate_required([:description, :price])
  end
end
