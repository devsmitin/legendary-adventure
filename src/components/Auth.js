/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";

export default function Auth(props) {
  const cancelButtonRef = useRef(null);

  const [formValues, updateFormValues] = useState({
    userID: "",
  });

  const inputsHandler = (e) => {
    updateFormValues({ [e.target.name]: e.target.value });
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={props.isOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="p-4 md:p-6 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                <UserIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Hello User!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Make sure to securely store your login ID once you create
                    your account. There is no way to retrive your account
                    without your ID. If you are existing user and forgot your
                    ID, please create new one.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <input
                  id="userID"
                  name="userID"
                  type="text"
                  required
                  value={formValues.userID}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="User ID"
                  onChange={inputsHandler}
                />
              </div>
              <div className="mt-3 sm:flex sm:justify-center">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    formValues.userID !== "" &&
                      formValues.userID.length > 3 &&
                      props.authUser(formValues.userID);
                  }}
                >
                  Login using ID
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.isOpen(false)}
                  ref={cancelButtonRef}
                >
                  New user? Create account
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
