import Layout from "../../components/layout/Layout";
import Image from "next/image";
import PersonalInfo from "../../components/listContent/content/people/PersonalInfo";
import Biography from "../../components/listContent/content/people/Biography";
import KnownFor from "../../components/listContent/content/people/KnownFor";
import { cinemaAPI } from "../../services/api";
import { MainNavigation } from "../../components/navigation/Navigation";

export async function getServerSideProps(context) {
  const personId = context.params.personId;
  const person = await cinemaAPI.get(`/persons/${personId}`);

  return {
    props: {
      detailPerson: person.data.data,
    },
  };
}

export default function DetailPerson(props) {
  const { detailPerson } = props;

  return (
    <Layout>
      <header>
        <div className="relative h-16 lg:h-20  border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <MainNavigation />
        </div>
      </header>

      <main>
        <div className="relative h-auto bg-gray-100 dark:bg-black text-black dark:text-white py-4 px-3 md:px-8 lg:py-8 lg:px-14">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col lg:max-w-md">
              <div className="flex flex-col justify-center items-center lg:items-start lg:mb-5">
                <div className="relative h-60 w-44 sm:h-64 sm:w-48 lg:h-lg-img-detail-people lg:w-72 mb-2 flex-shrink-0 rounded-lg shadow-xl transform overflow-hidden">
                  <Image
                    src={`${
                      detailPerson.profile_path
                        ? "https://image.tmdb.org/t/p/original" +
                          detailPerson.profile_path
                        : "https://i.ibb.co/xMkDFGB/profile.jpg"
                    }`}
                    alt="bg-poster"
                    layout={"fill"}
                    objectFit={"fill"}
                    priority={true}
                    quality={100}
                  />
                </div>
                <div className="font-bold text-3xl my-3 lg:hidden">
                  {detailPerson.name}
                </div>
              </div>

              <PersonalInfo detailPerson={detailPerson} />
            </div>
            {/* div 2 */}
            <div className="flex flex-col px-2 lg:px-0 lg:pl-7 lg:pt-1 lg:w-9/12">
              <Biography detailPerson={detailPerson} />
              <KnownFor detailPerson={detailPerson} />
            </div>
          </div>
        </div>
      </main>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
