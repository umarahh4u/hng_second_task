This project is a Number Classification API

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5000/api/v1/classify-number?number=380](http://localhost:5000/api/v1/classify-number?number=380) with your browser to see the result.

## Documentation

Request Format:
HTTP Method: GET

Response Format: Status Code: 200 OK
Response Body:

### Endpoint

GET /api/classify-number

### Query Parameters

number (integer, required): The number to be classified.

### Usage Example

GET http://localhost:3000/api/v1/classify-number?number=371

#### This API can be used in mathematical tools, educational applications, or any service that requires number classificatio

## Example Response:

{
"number": 371,
"is_prime": false,
"is_perfect": false,
"properties": ["armstrong", "odd"],
"digit_sum": 11, // sum of its digits
"fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" //gotten from the numbers API
}
