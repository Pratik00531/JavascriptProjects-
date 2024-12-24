// 1. Write a program to check is a given number is
// even or odd
// positive, negative or zero

// function odd (num){
//     if (num%2 == 0){
//         console.log("Even");
//     }
//     else{
//         console.log("odd");
//     }
// }
// odd(22)

//2. 
// function pos(num){
//     if(num>0){
//         console.log("Positive");
//     }
//     else if(num<0){
//         console.log("Negative");
//     }
//     else{
//         console.log("It's zero");
//     }
// }
// pos(5)


// 2. Write a program to calculate the sum of the first N natural numbers
// function calculatesum(n){
//     let sum = 0 ;
//     sum = n * ( n+1 ) / 2;
//     console.log(sum);   
// }
// calculatesum(4)
//Output: 10

//3. Write a program to calculate the factorial of a given number
function factorial(n){
    let result = 1;
    for (let i = n; i > 0; i--){
        result *= i;
    }
    console.log(result);
}
factorial(5)
