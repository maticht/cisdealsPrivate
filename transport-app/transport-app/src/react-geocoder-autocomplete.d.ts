declare module 'react-geocoder-autocomplete' {
    interface GeocoderAutocompleteProps {
        apiKey: string;
        country?: string;
        placeholder?: string;
        onSelect?: (address: string, location: { lat: number, lng: number }) => void;
    }

    const GeocoderAutocomplete: React.FC<GeocoderAutocompleteProps>;
    export default GeocoderAutocomplete;
}
