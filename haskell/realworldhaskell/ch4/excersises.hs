import Data.Char

asInt ('-':[]) = 0
asInt ('-':xs) = (-1) * asInt xs
asInt s = foldl step 0 s
    where step acc x = acc * 10 + digitToInt x

myGroupBy f xs = foldl step [] xs
    where step acc x
            | null acc = [[x]]
            | f ( last (last acc)) x = init acc ++ [last acc ++ [x]]
            | otherwise = acc ++ [[x]]

myAny f xs = foldl step False xs
    where step acc x = acc || f x

myCycle xs = foldr (\_ acc -> xs ++ acc) [] [1..]

myWords xs = filter (not . null) (foldl step [] xs)
    where step acc x
            | x == ' ' = acc ++ [[]]
            | null acc = [[x]]
            | otherwise = init acc ++ [last acc ++ [x]]

myUnlines xs = foldl (\acc x -> acc ++ x ++ "\n") "" xs