import logo from './assets/logo.jpeg';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className=" text-4xl font-bold mb-4 text-pink-600">
        Sweet Shop Management System
      </h1>
      <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">  
      <img className="size-12 shrink-0 rounded-full" src={logo} alt="ChitChat Logo" />  <div>    
        <div className="text-xl font-medium text-black dark:text-white">Wellcome to Sweet Shop</div>   
         <p className="text-gray-500 dark:text-gray-400">Satisfy Your Hunger!</p>  
         </div></div>


    </div>
  );
}

export default App;
