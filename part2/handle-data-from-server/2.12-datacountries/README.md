https://fullstackopen.com/en/part2/getting_data_from_server 

## 2.12* Data for countries, step1
The API https://restcountries.com provides data for different countries in a machine-readable format, a so-called REST API.

Create an application, in which one can look at data of various countries. The application should probably get the data from the endpoint all.

The user interface is very simple. The country to be shown is found by typing a search query into the search field.

If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific ...
![alt text](https://fullstackopen.com/static/d8a3e3b3af8907d0c3dd495ef0d26ba6/5a190/19b1.png)

If there are ten or fewer countries, but more than one, then all countries matching the query are shown ...
![alt text](https://fullstackopen.com/static/1d4ebf199806ccfe0df529c08e2a0c6d/5a190/19b2.png)

When there is only one country matching the query, then the basic data of the country, its flag and the languages spoken there, are shown ... 
![alt text](https://fullstackopen.com/static/1d4bba516fb538c5214f37c4a2ab0f8e/5a190/19b3.png)

NB: It is enough that your application works for most of the countries. Some countries, like Sudan, can be hard to support, since the name of the country is part of the name of another country, South Sudan. You need not to worry about these edge cases

## 2.13*: Data for countries, step2
There is still a lot to do in this part, so don't get stuck on this exercise!

Improve on the application in the previous exercise, such that when the names of multiple countries are shown on the page there is a button next to the name of the country, which when pressed shows the view for that country:

https://fullstackopen.com/static/b8986829d36bd14bbbd6270e0e8d2edf/5a190/19b4.png

In this exercise it is also enough that your application works for most of the countries. Countries whose name appears in the name of another country, like Sudan, can be ignored.

## 2.14*: Data for countries, step3
There is still a lot to do in this part, so don't get stuck on this exercise!

Add to the view showing the data of a single country, the weather report for the capital of that country. There are dozens of providers for weather data. One suggested API is https://openweathermap.org.
![alt text](https://fullstackopen.com/static/55e0007d51bf9506697001f03860a4d9/5a190/19ba.png)


NB: In some browsers (such as Firefox) the chosen API might send an error response, which indicates that HTTPS encryption is not supported, although the request URL starts with http://. This issue can be fixed by completing the exercise using Chrome.

NB: You need an api-key to use almost every weather service. Do not save the api-key to source control! Nor hardcode the api-key to your source code. Instead use an environment variable to save the key.

* Assuming the api-key is t0p53cr3t4p1k3yv4lu3, when the application is started like so:
    REACT_APP_API_KEY='t0p53cr3t4p1k3yv4lu3' npm start // For Linux/macOS Bash
    ($env:REACT_APP_API_KEY='t0p53cr3t4p1k3yv4lu3') -and (npm start) // For Windows PowerShell
    set REACT_APP_API_KEY='t0p53cr3t4p1k3yv4lu3' && npm start // For Windows cmd.exe

* you can access the value of the key from the process.env object:
const api_key = process.env.REACT_APP_API_KEY
// variable api_key has now the value set in startup

Note that if you created the application using npx create-react-app ...and you want to use a different name for your environment variable then the environment variable name must still begin with REACT_APP_. You can also use a .envfile rather than defining it on the command line each time by creating a file entitled '.env' in the root of the project and adding the following.

###### .env

* REACT_APP_API_KEY=t0p53cr3t4p1k3yv4lu3