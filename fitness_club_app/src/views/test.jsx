import supabase from "../services/supabase.js";

const handleNewTest = async (event) => {
    event.preventDefault();

    const test_date = test_dateRef.current.value;
    const day_mp = day_mpRef.current.value;
    const weight = weightRef.current.value;


    const { data, error } = await supabase
        .from('Results')
        .insert([
            { club_number: club_number, test_date: test_date, day_mp: day_mp, weight: weight }
        ]);

    if (data) {
        showSuccess('You have added a new test data');
    }

    if (error) {
        showError(error.message);
    }
};

