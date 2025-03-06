import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../Context/Users/UserContext'

const Checkout = () => {
  const userCtx = useContext(UserContext);
  const { cart = [], sessionURL, getCheckoutSession, editCart } = userCtx;
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      getCheckoutSession();
    } catch (error) {
      setError("Error al procesar el pago. Inténtalo de nuevo.");
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }


  };

  useEffect(() => {
    if (sessionURL) window.location.href = sessionURL;
  }, [sessionURL]);

  useEffect(() => {
    const reduceTotalFromOrder = () => {
      if (!cart || cart.length === 0) return 0;

      return cart.reduce((acc, cv) => {
        const updateQuantity = (cv.price / 100) * cv.quantity;
        return updateQuantity + acc;
      }, 0);
    };

    const getOrderDetails = () => {
      const total = reduceTotalFromOrder();
      setTotal(total);
    };

    getOrderDetails();
  }, [cart]);

  const handleChange = (e) => {
    if (!cart || cart.length === 0) return;

    const updatedCart = cart.map((elt) => {
      return elt.priceID === e.target.name
        ? {
          ...elt,
          quantity: parseInt(e.target.value)
        }
        : elt;
    });
    editCart(updatedCart);
  };

  const handleRemove = (e, currentPriceID) => {
    e.preventDefault();
    if (!cart || cart.length === 0) return;

    const updatedCart = cart.filter((elt) => {
      return elt.priceID !== currentPriceID;
    });
    editCart(updatedCart);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-4xl mx-4 py-8 md:mx-auto text-center">
        <h1 className="text-3xl font-bold mt-8">Carrito</h1>
        <p className="mt-4">Tu carrito está vacío</p>
        <div className="mt-4">
          <Link to="/catalogo-de-productos" className="underline text-blue-500">
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-4 py-8 md:mx-auto">
        <h1 className="text-3xl font-bold mt-8">Carrito</h1>

        <form className="mt-12">
          <ul>
            {cart.map((e) => {
              return (
                <li key={e.id || e.priceID} className="flex py-10">
                  <figure>
                    <img
                      src={e.img}
                      alt={e.name}
                      className="checkout-figure-img"
                    />
                  </figure>

                  <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="flex justify-between sm:grid sm:grid-cols-2">
                      <div className="pr-6">
                        <h3 className="text-sm">
                          <Link
                            to={`/catalogo-de-productos/${e.slug || e.name}`}
                            className="underline font-medium"
                          >
                            {e.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{e.size || 'Estándar'}</p>
                      </div>

                      <p className="text-sm font-medium text-gray-900 text-right">
                        ${((e.price / 100) * e.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
                      <select
                        id={`quantity-${e.id || e.priceID}`}
                        name={e.priceID}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="block border border-gray-300 px-2 py-1 text-sm"
                      >
                        {Array(5)
                          .fill(null)
                          .map((_, i) => {
                            const initial = i + 1;

                            return initial === e.quantity ? (
                              <option key={initial} selected value={initial}>
                                {initial}
                              </option>
                            ) : (
                              <option key={initial} value={initial}>{initial}</option>
                            );
                          })}
                      </select>

                      <button
                        type="button"
                        onClick={(evt) => {
                          handleRemove(evt, e.priceID);
                        }}
                        className="text-sm font-sm ml-4 md:ml-0 mt-2 text-brand-purple"
                      >
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="bg-gray-100 px-4 py-6 sm:p-6 lg:p-8">
            <div>
              <dl className="-my-4 text-sm ">
                <div className="py-4 flex items-center justify-between">
                  <dt className="font-bold">Total</dt>
                  <dd className="">$ {total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
              {error}
            </div>
          )}

          <div className="mt-10">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              disabled={isLoading}
              className={`form-button ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Procesando...' : 'Procesar pago'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Checkout