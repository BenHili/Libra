defmodule Libra.BookApi do
  require HTTPoison
  require Logger

  def getByTitle(title) do
    url = "https://www.googleapis.com/books/v1/volumes?q=intitle:#{URI.encode(title)}"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        req = Poison.decode!(body)

        cond do
          req["totalItems"] == 0 ->
            []

          true ->
              Enum.map(req["items"], fn item ->
                %{
                  :id => get_in(item, ["id"]),
                  :title => get_in(item, ["volumeInfo", "title"]),
                  :image => get_in(item, ["volumeInfo", "imageLinks", "thumbnail"]),
                  :authors => get_in(item, ["volumeInfo", "authors"]),
                  :price => "99.99"
                }
              end)
        end

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        Logger.info("Not found :(")

      {:error, %HTTPoison.Error{reason: reason}} ->
        Logger.error(reason)
    end
  end

  def getById(google_id) do
    url = "https://www.googleapis.com/books/v1/volumes/#{"google_id"}"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        req = Poison.decode!(body)

        %{
          :id => get_in(req, ["id"]),
          :title => get_in(req, ["volumeInfo", "title"]),
          :authors => get_in(req, ["volumeInfo", "authors"]),
          :image => get_in(req, ["volumeInfo", "imageLinks", "thumbnail"]),
          :page_count => get_in(req, ["volumeInfo", "pageCount"]),
          :description => get_in(req, ["volumeInfo", "description"]),
          :google_id => google_id
        }

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        Logger.info("Not found :(")
        %{}

      {:error, %HTTPoison.Error{reason: reason}} ->
        Logger.error("Command Broke " <> reason)
        %{}
    end
  end
end
