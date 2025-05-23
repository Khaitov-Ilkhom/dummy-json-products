import {Facebook, Github, Instagram, Mail, Twitter} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import visa from "@/assets/images/Badge.png"
import mastercard from "@/assets/images/Badge (1).png"
import paypal from "@/assets/images/Badge (2).png"
import applePay from "@/assets/images/Badge (3).png"
import googlePay from "@/assets/images/Badge (4).png"
import {useTranslation} from "react-i18next";


const Footer = () => {
  const {t} = useTranslation();

  return (
      <footer className="w-full max-w-[1400px] mx-auto">
        <div className="container mx-auto bg-black text-white md:px-10 py-4 rounded-xl">
          <div className="container mx-auto px-14 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="max-w-md">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase">{t("STAY UPTO DATE ABOUT OUR LATEST OFFERS")}</h2>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    type="email"
                    placeholder={t("Enter your email address")}
                    className="pl-10 bg-white text-black min-w-[300px] h-12 rounded-full"
                />
              </div>
              <Button className="h-12 px-6 rounded-full bg-white text-black hover:bg-gray-200">
                {t("Subscribe to Newsletter")}
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">PRODUCT SHOP</h2>
              <p className="text-muted-foreground mb-6">
                {t("We have clothes that suits your style and which you're proud to wear From women to men")}.
              </p>
              <div className="flex space-x-4">
                <Link to="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-gray-300 duration-500">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link to="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-gray-300 duration-500">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link to="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-gray-300 duration-500">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link to="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-gray-300 duration-500">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">Github</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1 md:ml-8">
              <h3 className="text-lg font-semibold mb-4">{t("COMPANY")}</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("About")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Features")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Works")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Career")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">{t("HELP")}</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Customer Support")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Delivery Details")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Terms & Conditions")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Privacy Policy")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">{t("FAQ")}</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Account")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Manage Deliveries")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Orders")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Payments")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">{t("RESOURCES")}</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Free eBooks")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Development Tutorial")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("How to - Blog")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-all duration-500">
                    {t("Youtube Playlist")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground md:mb-0 mb-3">Product Shop © 2000-{new Date().getFullYear()}, {t("All Rights Reserved")}</p>
            <div className="flex items-center space-x-4">
              <img src={visa} alt="Visa" className="h-10 hover:scale-110 transition-all duration-500" />
              <img src={mastercard} alt="Mastercard" className="h-10 hover:scale-110 transition-all duration-500" />
              <img src={paypal} alt="PayPal" className="h-10 hover:scale-110 transition-all duration-500" />
              <img src={applePay} alt="Apple Pay" className="h-10 hover:scale-110 transition-all duration-500" />
              <img src={googlePay} alt="Google Pay" className="h-10 hover:scale-110 transition-all duration-500" />
            </div>
          </div>
        </div>
      </footer>
  )
}
export default Footer
