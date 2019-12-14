defmodule LibraWeb.BuyController do
  use LibraWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def buy(conn, %{"query" => query}) do
    books = [
      %{
        :title => "Road to learn react",
        :image => "/images/road_to_learn_react.jpg",
        :description => "#{query}",
        :price => "$99.99"
      },
      %{
        :title => "Programming Phoenix 14",
        :image => "/images/programming_phoenix.jpg",
        :description => "Blah blah",
        :price => "Priceless"
      },
      %{
        :title => "Elixir In Action",
        :image => "/images/elixir_in_action.jpg",
        :description => "My boi",
        :price => "Priceless"
      }
    ]

    render(conn, "results.html", books: books)
  end
end
