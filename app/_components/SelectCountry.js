import { getCountries } from '@/app/_lib/data-service';
// import jsonCountries from '@/app/_lib/countries.json';
// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  // const countries = jsonCountries;
  // console.log(countries);
  const flag =
    countries.find((country) => country.names.common === defaultCountry)?.flag
    ?? '';

  return (
    <>
      <select
        name={name}
        id={id}
        // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
        defaultValue={`${defaultCountry}%${flag}`}
        className={className}
      >
        <option value="">Select country...</option>
        {countries.length > 0
          && countries.map((c) => (
            <option
              key={c.names.common}
              value={`${c.names.common}%${c.flag.emoji}`}
            >
              {c.names.common}
            </option>
          ))}
      </select>
      {/* <p>
        {JSON.parse(countries)}
      </p> */}
    </>
  );
}

export default SelectCountry;
