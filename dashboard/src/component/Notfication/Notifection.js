
import { UpdatesData } from "../../Pages/DataNotfication";
import './Notifection.css'
function Notifection() {
  return (
    <div className="Updates">
      <div className="border-bottom w-100 px-3 p-2">
        <h2>Notifications</h2>
      </div>
    {UpdatesData.map((update,index) => {
      return (
        <div className="update " key={index}>
          <img src={update.img} alt="profile" />
          <div className="noti">
            <div  style={{marginBottom: '0.5rem'}}>
              <span>{update.name}</span>
              <span> {update.noti}</span>
            </div>
              <span>{update.time}</span>
          </div>
        </div>
      );
    })}
  </div>
  );
}
export default Notifection;
