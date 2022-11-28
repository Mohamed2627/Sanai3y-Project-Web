import '../TAbleClient/TAbleClient.css' 
import { useState } from 'react';

 function TablComponent()
 {
const [stat,setState]=useState()


    return(
        <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Adress</td>
            <td>Status</td>
            <td>skills</td>
            <td>Discration</td>
            <td>Phone</td>

            <td>gender</td>
            <td>natinal Id</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
        {data.filter((item)=>item.firstName.toLowerCase().includes(serch)).map((item) => (
         
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.status}</td>
              <td>{item.skills[0]}</td>
              <td>{item.description}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.gender}</td>
              <td>{item.nationalId}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    // del(item.id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
 }