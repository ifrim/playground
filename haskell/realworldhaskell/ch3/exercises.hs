import Data.List

len :: [t] -> Int
len [] = 0
len (x:xs) = 1 + (len xs)

mean :: [Float] -> Float
mean [] = 0.0
mean xs = sum xs / fromIntegral (length xs)

reverseList :: [t] -> [t]
reverseList [] = []
reverseList (x:xs) = reverseList xs ++ [x]

makePalindrome :: [t] -> [t]
makePalindrome xs = xs ++ reverseList xs

isPalindrome :: (Eq t) => [t] -> Bool
isPalindrome [] = True
isPalindrome (x:[]) = True
isPalindrome (x:xs) = x == last xs && isPalindrome (take ((length xs) - 1) xs)

sortListOfLists :: [[t]] -> [[t]]
sortListOfLists [] = []
sortListOfLists xs = sortBy compareListLengths xs
    where compareListLengths a b
            | lena == lenb = EQ
            | lena > lenb = GT
            | otherwise = LT
            where
                lena = length a
                lenb = length b