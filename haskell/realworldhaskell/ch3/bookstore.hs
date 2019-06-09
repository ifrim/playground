data BookInfo =
    Book Int String [String]
    deriving (Show)

myInfo = Book 1 "Real word haskell" ["John Doe", "Jane Dona"]

type BookId = Int
type BookTitle = String
type BookAuthor = String

data BetterBook =
    BetterBook BookId BookTitle [BookAuthor]
    deriving (Show)

getBookId (BetterBook id title authors) = id
getBookTitle (BetterBook id title authors) = title
getBookAuthors (BetterBook _ _ authors) = authors

bookInfo = BetterBook 2 "Another haskell book" ["Smart Guy", "Smart Dude"]

type CardHolder = String
type CardNumber = String
type Address = [String]
type CustomerID = Int

data BillingInfo =
    CreditCard CardNumber CardHolder Address
    | CashOnDelivery
    | Invoice CustomerID
    deriving (Show)

data Customer = Customer {
    customerName :: String,
    customerAge :: Int
} deriving (Eq, Show)