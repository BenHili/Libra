defmodule Libra.OpenLibrary do
  require Logger
  require HTTPoison

  def getByIsbn(isbn) do
    url = "https://openlibrary.org/api/books?bibkeys=ISBN:#{isbn}&format=json&jscmd=data"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        req = Poison.decode!(body)

        book_data = req["ISBN:#{isbn}"]

        %{
          :isbn_13 => isbn,
          :title => book_data["title"],
          :image => get_in(book_data, ["cover", "medium"]),
          :authors => book_data["authors"]
                      |> Enum.map(fn x -> get_in(x, ["name"])end ),
          :page_count => book_data["number_of_pages"]
        }

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        Logger.info("Not found :(")

      {:error, %HTTPoison.Error{reason: reason}} ->
        Logger.error(reason)

    end
  end
end
