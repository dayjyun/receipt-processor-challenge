# Receipt Processor Challenge
Who doesn't love shopping? Best part of all is getting rewarded for spending your own money. This webservice API obtains metadata for receipts and calculates the points rewarded for each receipt.

## How To Run
We're going to use Docker in order to run the webservice.

1. To begin, enter either of the two Image commands shown below on your terminal. <br> Note: In some systems, you will need to open the Docker application first in order get the Docker environment ready.

    * Image Id
        * `docker run -p 5000:8080 235529d35494`


    * Image Tag Name
        * `docker run -p 5000:8080 dayjyun/receipt-processor-challenge:latest`

<br>

2. Navigate to `localhost:5000` in your browser's search bar.

3. Copy and paste any of the following endpoints on your search bar after `5000`

Data does not persist and will be

# Endpoints
There are two main routes to be considered marked with an `*`.
I added two additional routes in order to have a more expanded view of the data being rendered

## Get All Receipts
Returns a list of Receipts
- Request
    - Method: GET
    - URL: `/receipts`
    - body: none

- Successful Response
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
      "retailer": "Store Name",
      "purchaseDate": "2022-01-01",
      "purchaseTime": "13:00",
      "total": "2.00",
      "items": [
        {
            "shortDescription": "Item Name",
            "price": "2.00"
        }
      ],
      "id": "####",
      "points": "10"
    }
    ```

## Get Receipt By Using Receipt ID
Returns single receipt provided by the receipt's ID
- Request
    - Method: GET
    - URL: `/receipts/{id}`
    - body: none

- Successful Response
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
      "retailer": "Store Name",
      "purchaseDate": "2022-01-01",
      "purchaseTime": "13:00",
      "total": "2.00",
      "items": [
        {
          "shortDescription": "Item Name",
          "price": "2.00"
        }
      ],
      "id": "####",
      "points": "10"
    }
    ```
- Error Response: No receipt found for that id
    - Status Code: 404
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
      "message": "No receipt found for that id",
      "status": 404
    }
    ```

## *Get Points By Using Receipt ID
Returns points for receipt provided by the receipt's ID
- Request
    - Method: GET
    - URL: `/receipts/{id}/points`
    - body: none

- Successful Response
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
      "points": "10"
    }
    ```
- Error Response: No receipt found for that id
    - Status Code: 404
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
      "message": "No receipt found for that id",
      "status": 404
    }
    ```

## *Post A New Receipt
Creates new receipt data
Returns points for receipt provided by the receipt's ID
- Request
    - Method: POST
    - URL: `/receipts/process`
    - body:
    ```json
    {
      "retailer": "Store Name",
      "purchaseDate": "2022-12-01",
      "purchaseTime": "13:00",
      "total": "13.37",
      "items": [
        {
          "shortDescription": "Item Name",
          "price": "2.00"
        }
      ],
    }
    ```

- Successful Response
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
      "points": "10"
    }
    ```
- Error Response: The receipt is invalid
    - Status Code: 400
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
      "message": "The receipt is invalid",
      "status": 400
    }
    ```

Note: You can test the POST API by inputting [this fetch request](https://github.com/dayjyun/receipt-processor-challenge/blob/main/fetchRequest.js) into your browser's console

## Notes

Inside of `data.js`, I commented out an alternative solution named `getPoints()` that, when called, executes the same functionality as `calculatePoints()`. The main reason why I decided to complete the assignment with `calculatePoints` is because I wanted to follow SRP, the Single Responsibility Principle. While SRP is normally dedicated for classes and modules, directing a similar approach helps return the desired output from the individual function and nothing else.

By keeping SRP in mind, I created inner functions for each point requisite to add to the point counter, and if in the future there happened to be an error in the code or needed to be modified, it would be identifiable more easily compared to a chain of statements.

If you would like to give `getPoints()` a try, on the `data.js` file, simply comment in the `getPoints` function listed under Method 2, comment in the statements with `Alternative` written next to it and comment out the code directly above. There are only 2 places in the file where this is required.

Feel free to let me know if you have any questions. Have fun!
