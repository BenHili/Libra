defmodule Libra.Book do
  use Ecto.Schema
  import Ecto.Changeset
  alias Libra.Repo

  schema "books" do
    field :title, :string
    field :authors, {:array, :string}
    field :isbn_13, :string
    field :image, :string
    field :page_count, :integer

    timestamps()
  end

  @doc false
  def changeset(book, params \\ %{}) do
    book
    |> cast(params, [:title, :authors, :image, :isbn_13, :page_count])
    |> unique_constraint(:isbn_13_constraint, name: :pk_isbn_13)
    |> validate_required([:title, :authors, :image, :isbn_13, :page_count])
  end

  def upsert(changeset) do
    Repo.insert!(
      changeset,
      on_conflict: :replace_all_except_primary_key,
      conflict_target: :isbn_13
    )
  end

end
