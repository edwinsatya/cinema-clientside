import Layout from "../../components/layout/Layout";
import DetailHeader from "../../components/header/DetailHeader";
import ContentBox from "../../components/listContent/content/ContentBox";
import CardAnyTrailer from "../../components/listContent/card/CardAnyTrailer";
import CardNoTrailer from "../../components/listContent/card/CardNoTrailer";
import { cinemaAPI } from "../../services/api";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(context) {
  const tvShowId = context.params.tvShowId;
  const tv = await cinemaAPI.get(`/tv/${tvShowId}`);

  return {
    props: {
      detailTv: tv.data.data,
    },
  };
}

export default function DetailTvShow(props) {
  const { detailTv } = props;
  console.log(detailTv);
  const [indexTrailer, setIndexTrailer] = useState(null);
  const router = useRouter();

  const selectedTrailer = (index) => {
    window.scrollTo(0, 0);
    setIndexTrailer(index);
  };

  return (
    <Layout title="Detail Tv Show">
      <DetailHeader
        dataHeader={detailTv}
        indexTrailer={indexTrailer}
        onCloseTrailer={() => setIndexTrailer(null)}
      ></DetailHeader>

      <hr className="border-b-4 border-gray-500 shadow-2xl" />

      <section id="list-content">
        <div className="p-4 sm:p-6 md:p-8 lg-p-10 transform transition-all duration-500 bg-gray-100 dark:bg-black text-black dark:text-white">
          <ContentBox title={"List Trailer :"}>
            {detailTv.video.length > 0 ? (
              detailTv.video.map((vid, index) => {
                return (
                  <CardAnyTrailer
                    key={index}
                    indexTrailer={index}
                    videoKey={vid.key}
                    onClick={(e) => selectedTrailer(e)}
                  />
                );
              })
            ) : (
              <CardNoTrailer />
            )}
          </ContentBox>
        </div>
      </section>
    </Layout>
  );
}
