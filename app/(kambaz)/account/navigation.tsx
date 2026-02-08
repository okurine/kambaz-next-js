import Link from "next/link";
export default function AccountNavigation() {
 return (
   <div id="wd-account-navigation" className="wd list-group fs-6 rounded-0">
     <Link className="list-group-item text-danger border-0" href="signin"> Signin </Link> 
     <Link className="list-group-item text-danger border-0" href="signup"> Signup </Link> 
     <Link className="list-group-item text-danger border-0" href="profile"> Profile </Link> 
   </div>
);}
