defmodule LibraWeb.Router do
  use LibraWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LibraWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/home", PageController, :index
    get "/search", PageController, :search
  end

  # Other scopes may use custom stacks.
  # scope "/api", LibraWeb do
  #   pipe_through :api
  # end
end
