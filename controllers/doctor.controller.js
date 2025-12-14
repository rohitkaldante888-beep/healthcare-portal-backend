const supabase = require("../config/db.js");

const getDoctors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("doctors")
      .select("id, full_name, specialization")
      .eq("is_active", true);
    if (error) throw error;

    res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getDoctors };
