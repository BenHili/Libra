defmodule Libra.Book do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

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
    |> unique_constraint(:google_id_constraint, name: :pk_google_id)
    |> validate_required([:title, :authors, :description, :image, :google_id, :page_count])
  end

  def fuzzy_search(query_string, threshold) do
    Libra.Repo.all(
      from b in Libra.Book,
        where:
          fragment(
            "levenshtein(?, ?)",
            b.title,
            ^query_string
          ) <= ^threshold
    )
  end
end
