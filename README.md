# Frontend Techinical Challenge

## Description
The overall goal of the technical challenge is for us to get an idea of how you approach tasks, your coding style, your organization skills, and your technical experience as a frontend engineer in general.

We want to be sensitive of the time you spend working on this, so we have designed the technical challenge to be a simpler version of a task an engineer in this role would be assigned. After we review the assignment, we want to invite you back and set some time to discuss your work and learn about your process.


## Challenge

### Overview
For this exercise, we'll be building a basic dashboard that shows three counter cards each displaying a label, value and spline chart with data from the last seven days. In addition to that, two buttons will send requests to a pre-built API (included in the project). One to refresh the data and another to return an error.

> [!IMPORTANT]
> We strongly encourage you to use our preferred framework **Vue.js / Nuxt** as it is part of our current tech stack. However, if you are not familiar enough with either and believe using another framework would better show your experience as an engineer, you are free to create your own project and follow the general requirements of this technical challenge.

#### Nuxt API
For this exercise, we have pre-built an API endpoint we'll be able to access through `http://localhost:3000/api/counters` to get data for our components. 
- You can find the API file at `server/api/counters`.
- The endpoint simulates a `1000ms` delay we'll use for loading states.
- Passing the `?error=true` parameter in the request returns an `error` object we'll need.
- Each key in the `GET /api/counters` response returns a `data` property with seven days worth of data in the form of `[date: string, value: number]`.

##### GET `/api/counters`
```ts
{
  retention_rate: {
    data: [
      ['date', value]
      // ...[]
    ],
  },
  transactions: {
    data: [
      ['date', value]
      // ...[]
    ],
  },
  revenue: {
    data: [
      ['date', value]
      // ...[]
    ],
  }
}
```

### Preview
https://github.com/user-attachments/assets/59a776ec-c91f-411b-87d6-175bbdad7ab4

### Tasks
>[!NOTE]
>Please use the preview above as the design requirement. No specific values are provided as we are only using pre-installed Tailwind styles.

- Install `shadcn-vue`'s Sonner and Skeleton components. `shadcn-vue` package has already been installed and configured in this project. You will only need to install the individual components:
  - [Sonner](https://www.shadcn-vue.com/docs/components/sonner.html)
  - [Skeleton](https://www.shadcn-vue.com/docs/components/skeleton.html)
- Build a reusable component with the following elements:
  - Label
  - Value
  - Chart - _We are using Highcharts for this exercise. More information about how it works in the next steps._
- Build the index page showing the three counter components.
  - **Transactions** - Displaying today's value formatted with the number comma separated in the thousands (e.g. 9,413) and zero fraction digits.
  - **Avg. Revenue** - Displaying the average value over the last seven days formatted as a USD currency.
  - **Retention Rate** - Displaying today's value formatted as a percentage with a maximum of two fraction digits.
- Add two request buttons:
  - **Refresh Data** - On click, make a request to `/api/counters` and update the data displayed.
  - **Execute Error** - On click, make a request to `/api/counters` with the query param `?error=true` to generate an error.
- Add the chart to the reusable component using the `custom/Highcharts.vue` component. 
  - This component uses an `options` prop of type `Highcharts.Options`.
  - Update the `composables/useHighchartsOptions.ts` composable to do the following:
    - Set width and height to fit in the reusable component.
    - Remove the default chart background.
    - Update the `tooltip.formatter()` property for each of the options to show the formatted values as we did previously for each type: percentage, USD currency, numbers without fraction digits. See `preview` for layout of tooltip.
  - Use the `composables/useHighchartsOptions.ts` composable to pass correct options to each of the reusable components built.
- On page load, retrieve `/api/counters` data.
  - You will need to pass the `/api/counters` data (e.g. `transactions.data`) to the options object pass as a prop to `<Highcharts :options="transactionsOptions" />`.
  - To do this, you can do `transactionsOptions.value.series = [data: transactions.data, color: '{splineColor}']` after every GET successful request.
- Create a `getSplineColor()` function to return a green, blue, red color depending on the health value. Used in `transactionsOptions.value.series`.
- Use the `Sonner` component to display a Toast error to handle errors when making a request and display the error message provided by the API.
- Use the `Skeleton` component while loading data in the reusable components.
   
## Useful Documentation
- [Nuxt](https://nuxt.com/docs/getting-started/introduction)
- [Highcharts](https://api.highcharts.com/highcharts/)
- [Day.js](https://day.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```