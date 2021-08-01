export default function PersonalInfo(props) {
  const { detailPerson } = props;

  const calculateAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  return (
    <div className="flex px-5 lg:px-0 flex-col">
      <h3 className="font-semibold text-lg">Personal Info</h3>
      <div className="flex justify-between sm:justify-start lg:flex-col">
        <div className="flex flex-col my-1">
          <span className="font-semibold text-base">Known For</span>
          <span className="font-medium text-sm">
            {detailPerson.known_for_department || "-"}
          </span>
        </div>
        <div className="flex flex-col my-1 sm:ml-14 lg:ml-0">
          <span className="font-semibold text-base">Known Credits</span>
          <span className="font-medium text-sm">
            {detailPerson.credits.length}
          </span>
        </div>
      </div>
      <div className="flex flex-col my-1">
        <span className="font-semibold text-base">Gender</span>
        <span className="font-medium text-sm">
          {detailPerson.gender == 1
            ? "Female"
            : detailPerson.gender == 2
            ? "Male"
            : "-"}
        </span>
      </div>
      <div className="flex flex-col my-1">
        <span className="font-semibold text-base">Birthday</span>
        <span className="font-medium text-sm">
          {detailPerson.birthday
            ? `${detailPerson.birthday} (${calculateAge(
                detailPerson.birthday
              )} years old)`
            : "-"}
        </span>
      </div>
      <div className="flex flex-col my-1">
        <span className="font-semibold text-base">Place of Birth</span>
        <span className="font-medium text-sm">
          {detailPerson.place_of_birth || "-"}
        </span>
      </div>
      <div className="hidden lg:flex flex-col my-1">
        <span className="font-semibold text-base">Also Known As</span>
        {detailPerson.also_known_as.length > 0 ? (
          detailPerson.also_known_as.map((el, index) => {
            return (
              <span key={index} className="font-medium text-sm">
                {el}
              </span>
            );
          })
        ) : (
          <span className="font-medium text-sm">-</span>
        )}
      </div>
    </div>
  );
}
