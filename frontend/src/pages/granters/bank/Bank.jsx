// import header from '../../../components/header/header';
import AddBankAcc from './add-bank-account/AddBankAcc';
import Footer from '../../../components/footer/Footer';
import './bank.css'

function BankAcc() {
    return (
        <div className="bank">
            {/* <header></header> */}
            <AddBankAcc></AddBankAcc>
            <Footer></Footer>
        </div>
    );
}

export default BankAcc;