defmodule Libra.Book do
  use Ecto.Schema
  import Ecto.Changeset

  schema "books" do
    field :authors, {:array, :string}
    field :description, :string
    field :google_id, :string
    field :image, :string
    field :page_count, :integer
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(book, attrs) do
    book
    |> cast(attrs, [:title, :authors, :description, :image, :google_id, :page_count])
    |> validate_required([:title, :authors, :description, :image, :google_id, :page_count])
  end
end
