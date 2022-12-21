import { BsPaypal } from "react-icons/bs"
import { MdPayment } from "react-icons/md"
import { RiBankCardFill } from "react-icons/ri"
import Offer from "../../components/offers/Offer"
import { loadUser } from "../../redux/actions/AuthActions"
import { getAllOffers } from "../../redux/actions/OffersActions"
import { setActiveMenu } from "../../redux/actions/UiActions"
import { wrapper } from "../../redux/store"
import { useSelector } from "react-redux"
import { Button, message } from "antd"

export default function Offers({ offers, user }) {
  
  return (
    <div>
        <p className="text-3xl font-bold">Check our offers</p>
        <div className="w-full px-4 py-3 bg-egor-primary-400 rounded-lg mt-4">
          <p className="text-lg font-semibold">You can send the money to CCP or Paysera</p>
          <div className="flex items-center space-x-3 italic text-gray-200">
            <MdPayment/>
            <p>  CCP : 0022454412 75</p>
          </div>
          <div className="flex items-center space-x-3 italic text-gray-200">
            <RiBankCardFill/>
            <p>  Paysera : sheriffe1994@gmail.com</p>
          </div>
          <div className="flex items-center space-x-3 italic text-gray-200">
            <BsPaypal/>
            <p>  Paypal : sheriffe1994@gmail.com</p>
          </div>
        </div>
        <div className="mt-5">
            {offers ? (
                <div className="grid md:grid-cols-3 gap-x-7 gap-y-2">
                    {offers.map(offer => (
                       <Offer key={offer.id} item={offer} user={user} />
                    ))}
                </div>
            ) 
            : (
                <p className="text-xl italic">No offer for the moment!</p>
            )}
        </div>
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, params, resolvedUrl}) => {
   store.dispatch(setActiveMenu(resolvedUrl.split('/')[1]))

    if(!store.getState().auth.user){
        await store.dispatch(loadUser(req.cookies.auth_token))
    }
    await store.dispatch(getAllOffers())
   
    return {
      props: {
       offers : store.getState().offers.offers,
       user: store.getState().auth.user,
      }
    }
  })