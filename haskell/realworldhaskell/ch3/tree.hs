data Tree a =
    Tree a (Tree a) (Tree a)
    | Nada
    deriving (Show)