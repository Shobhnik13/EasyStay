import '../EmailList/MailList.css'
const MailList = () => {
    return (
      <div className="mail bg-gradient-to-l from-blue-700 to-blue-400 ">
        <h1 className="mailTitle text-3xl font-semibold text-blue-100">Stay comfortable, stay easy!</h1>
        <span className="mailDesc text-lg ">Sign up and we'll send the best deals to you</span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Your Email here" />
          <button className=' bg-blue-800'>Subscribe</button>
        </div>
      </div>
    )
  }
  
  export default MailList