// It's not possible to do any data loading inside of componenets themselves
// When we render a component with NextJS, during these server side rendering phase,
// we don't get any opportunity to make request all of our components are executed
// or rendered just one single time.
import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// If we ever want to fetch some data with nextJS during the server
// side rendering we are going to define this get initil props function
// Here we can make async requests, generate data whatever we need to do
// to do to fetch data. This function will be executed on the server

//This getInitialProps is not invoked because another one is
//declared in __app.js

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
