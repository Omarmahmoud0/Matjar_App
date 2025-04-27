import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
} from "react-icons/bs";

const FooterPage = () => {
  return (
    <div className="mt-24">
      <Footer container>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                href="/"
                src="/assets/logo.png"
                alt="Flowbite Logo"
                name="MATJAR"
                
              />
            </div>
            <div className="grid grid-cols-3 gap-8 sm:mt-4 sm:grid-cols-4 sm:gap-6">
              <div>
                <Footer.Title title="electronics" />
                <Footer.LinkGroup col>
                  <Footer.Link href="/category/Electronics-phones">Mobiles</Footer.Link>
                  <Footer.Link href="/category/Electronics-laptops">Laptops</Footer.Link>
                  <Footer.Link href="/category/Electronics-headphone">Headphones</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="clothes" />
                <Footer.LinkGroup col>
                  <Footer.Link href="/category/clothes-mens">Men's</Footer.Link>
                  <Footer.Link href="/category/clothes-womens">Women's</Footer.Link>
                  <Footer.Link href="/category/clothes-kids">kids</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Github</Footer.Link>
                  <Footer.Link href="#">Facebook</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="about" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Contact us</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="/" by="MATJAR™" year={2024} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsInstagram} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default FooterPage;
