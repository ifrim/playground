add a b = a + b

myDrop n xs =
    if n <= 0 || null xs
    then xs
    else myDrop (n - 1) (tail xs)

lastButOne xs =
    if length xs > 1
    then head (drop ((length xs) - 2) xs)
    else error "The list is too short"