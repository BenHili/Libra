defmodule Libra.Book do
  use Ecto.Schema
  import Ecto.Changeset

  schema "books" do
    field :title, :string
    field :authors, {:array, :string}
    field :description, :string
    field :google_id, :string
    field :image, :string
    field :page_count, :integer

    timestamps()
  end

  @doc false
  def changeset(book, params \\ %{}) do
    book
    |> cast(params, [:title, :authors, :description, :image, :google_id, :page_count])
    |> validate_required([:title, :authors, :description, :image, :google_id, :page_count])
  end
end
