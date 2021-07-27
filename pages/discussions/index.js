import Layout from "../../components/layout/Layout";
import { MainNavigation } from "../../components/navigation/Navigation";
import { io } from "socket.io-client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const socket = io(publicRuntimeConfig.hostUrl);
export default function DiscussionsPage() {
  socket.on("newDiscussion", () => {
    console.log("triger new discuss");
  });
  return (
    <Layout title="discussions">
      <header>
        <MainNavigation></MainNavigation>
      </header>

      <main>
        <div className="h-screen w-full bg-black relative">
          <div className="px-4 md:px-8 lg:px-14 pt-16 lg:pt-20 flex flex-col lg:flex-row">
            <div className="text-white bg-red-500 p-3 flex overflow-x-auto lg:flex-col lg:h-97 lg:items-center lg:overflow-y-auto">
              <div className="bg-blue-600 px-4 flex-none lg:w-11/12">
                new discuss
              </div>
              <div className="bg-blue-600 px-4 mx-2 flex-none lg:w-11/12 lg:mx-0 lg:my-2">
                tes dasdas dasdas dasdas
              </div>
            </div>
            <div className="text-white">Content</div>
          </div>
        </div>
        <hr className="border-b-4 border-gray-500 shadow-2xl" />
      </main>
    </Layout>
  );
}
