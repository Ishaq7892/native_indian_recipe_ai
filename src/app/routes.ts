import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { CreateRecipe } from "./pages/CreateRecipe";
import VoiceRecipe from "./pages/VoiceRecipe";
import { RecipePreview } from "./pages/RecipePreview";
import { MyRecipes } from "./pages/MyRecipes";
import { Export } from "./pages/Export";
import { Root } from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
      { path: "dashboard", Component: Dashboard },
      { path: "create", Component: CreateRecipe },
      { path: "edit/:id", Component: CreateRecipe },
      { path: "voice-recipe", Component: VoiceRecipe },
      { path: "recipes", Component: MyRecipes },
      { path: "recipe/:id", Component: RecipePreview },
      { path: "recipe/preview", Component: RecipePreview },
      { path: "export", Component: Export },
    ],
  },
]);