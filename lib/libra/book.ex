defmodule Libra.Book do
  use Ecto.Schema
  import Ecto.Changeset

  schema "books" do
    field :description, :string
    field :image, :string
    field :price, :decimal
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(book, attrs) do
    book
    |> cast(attrs, [:title, :price, :description, :image])
    |> validate_required([:title, :price, :description, :image])
  end
end
