import React, {useState} from 'react'
import Sidebar2 from '../../Components/Sidebar2';
import Modal from "react-modal";
import m1 from '../../Assets/abt.png'

const Approve = () => {

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const toggleModal1 = () => {
      setIsModalOpen1(!isModalOpen1);
    };

  return (
    <div className='dashb'>

        <section className='dashboard'>
            <Sidebar2/>
            <main>
                <div className='add' style={{textAlign:'center'}}>
                    <h2>Unapproved Vendors</h2>

                </div>

                <table>
                    <tr className='heading'>
                        <th>Vendor Name</th>
                        <th>Email Address</th>
                        <th className='dt'></th>
                        
                    </tr>

                    <tr>
                        <td>Vendor1</td>
                        <td>vendor@gmail.com</td>
                        <td className='dt'><button onClick={toggleModal1}>See Details</button></td>
                        
                    </tr>

                    <tr>
                        <td>Vendor2</td>
                        <td>vendor@gmail.com</td>
                        <td className='dt'><button onClick={toggleModal1}>See Details</button></td>
                    </tr>

                </table>

                

            </main>
        </section>


        <Modal
            isOpen={isModalOpen1}
            onRequestClose={toggleModal1}
            contentLabel="Example Modal"
            className={`bg-transparnt`}
            style={{ 
              overlay: {
                position: "fixed",
                top: "0",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "hsla(0, 0%, 0%, .8)",
                zIndex:100000,
                
              },
            }}
          >
            <div className='modal1'>
              <div className='modal1-content'>
                <div className='close'>
                  <button onClick={() => setIsModalOpen1(false)} style={{cursor:'pointer'}}>X</button>
                </div>

                <section className='product-info'>
                    <div className='product-images'>

                        <img src={m1} alt="" />
                        

                    </div>

                    <div className='others'>

                        <p>Full Name: <span>Vendor1</span></p>
                        <p>Email Address: <span>vendor@gmail.com</span></p>
                        <p>Phone Number: <span>091625243536</span></p>
                        <p>Address: <span>Ada George, PH</span></p>
                        <p>Password: <span>o90qtqr5</span></p>

                    </div>
                </section>
                

              </div>

            </div>
            
          </Modal>
        
    </div>
  )
}

export default Approve