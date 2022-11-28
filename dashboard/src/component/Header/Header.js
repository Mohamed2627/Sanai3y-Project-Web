/* eslint-disable no-unused-vars */
import React from 'react';
import './Header.css'
 function Header() {
      return (
  
        <div class="parent">
        <header id="nav">
            <div class="container">
                <div class="logo">
                    <div class="logo_img">
                        <img src="./images/لوجو-صنايعي-final1.png" alt=""/>
                    </div>

                    <div>
                        <ul>
                            <li><a href="home.html">الصفحة الرئيسية</a></li>
                             <li><a href="#services">التخصصات</a></li>
                            <li><a href="#">سياسة الاستخدام</a></li>
                            <li><a href="index.html">من نحن</a></li>
                            <li><a href="chat.html">الرسايل</a></li>
                            <li><a href="#contact">إتصل بنا</a></li>
                        </ul>
                    </div>
                </div>


            </div>
        </header>
    </div> );
    }
  export default Header