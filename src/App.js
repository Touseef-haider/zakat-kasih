import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NetworkDetector from './utils/NetworkDetector';
import { PublicRoute } from './navigation/RouteTypes';


const loading = (
  <div className="pt-3 text-center">Loading...</div>
)

// Zakats
const Pendapatan = React.lazy(() => import('./views/zakats/pendapatan/Pendapatan'));
const Perniagaan = React.lazy(() => import('./views/zakats/perniagaan/Perniagaan'));
const Emas = React.lazy(() => import('./views/zakats/emas/Emas'));
const Kwsp = React.lazy(() => import('./views/zakats/kwsp/Kwsp'));
const WangSimpanan = React.lazy(() => import('./views/zakats/wangSimpanan/WangSimpanan'));
const UntungRugi = React.lazy(() => import('./views/zakats/perniagaan/UntungRugi'));
const ModalKerja = React.lazy(() => import('./views/zakats/perniagaan/ModelKerja'));
const ExtraInfo = React.lazy(() => import('./views/zakats/extraInfoAboutPendapatan'));

// const Cart = React.lazy(() => import('./views/zakats/cart'));
const CartItems = React.lazy(() => import('./views/zakats/cartItems'));
const SingleCartItem = React.lazy(() => import('./views/zakats/singleCartItem'));

const Login = React.lazy(() => import('./views/authentication/Login'));
const ResetPassword = React.lazy(() => import('./views/authentication/resetPassword'));
const ChangePassword = React.lazy(() => import('./views/authentication/changePassword'));
const Register = React.lazy(() => import('./views/authentication/Register'));
const TheLayout = React.lazy(() => import('./views/layout/TheLayout'));

function App() {
  return (
    <BrowserRouter basename='/kalkulator'>
      <React.Suspense fallback={loading}>
        <Switch>
          <PublicRoute exact path="/info" name="Info" component={ExtraInfo} />
          <PublicRoute exact path="/pendapatan" name="Zakat Pendapatan" component={Pendapatan} />
          <PublicRoute exact path="/perniagaan" name="Zakat Perniagaan" component={Perniagaan} />
          <PublicRoute exact path="/emas" name="Zakat Emas" component={Emas} />
          <PublicRoute exact path="/kwsp" name="Zakat Kwsp" component={Kwsp} />
          <PublicRoute exact path="/wang-simpanan" name="Wang Simpanan" component={WangSimpanan} />
          <PublicRoute exact path="/untung-rugi" name="Untung-rugi" component={UntungRugi} />
          <PublicRoute exact path="/modal-kerja" name="Modal-kerja" component={ModalKerja} />
          <PublicRoute exact path="/cartItems" name="Cart-Items" component={CartItems} />
          <PublicRoute exact path="/singleCartItem" name="Cart-Items" component={SingleCartItem} />
          <PublicRoute exact path="/reset-password/:id" name="Reset Password" component={ResetPassword} />

          <PublicRoute restricted exact path="/login" name="Login" component={Login} />
          <PublicRoute restricted exact path="/changePassword" name="Change Password" component={ChangePassword} />
          <PublicRoute restricted exact path="/daftar" name="Register" component={Register} />
          <PublicRoute path="/" name="Home" component={TheLayout} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default NetworkDetector(App);
