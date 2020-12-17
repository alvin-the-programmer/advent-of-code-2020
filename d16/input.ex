defmodule Input do
  def read(filename) do
      {:ok, input} = File.read(filename)
      input
  end

  def customs_array(filename) do
      filename
      |> read
      |> String.replace("\r", "")
      |> String.split("\n\n", trim: true)
  end

  def tickets_array(filename), do: customs_array(filename)

  def to_array(filename) do
      filename
      |> read
      |> String.replace("\r", "")
      |> String.split("\n", trim: true)
  end

  def to_ints(filename) do
      to_array(filename)
      |> Enum.map(&(String.to_integer(&1)))
  end

  def process_pword(string) do
      [rules, pword] = String.split(string, ":")
      [counts, letter] = String.split(rules, " ")
      [min, max] = String.split(counts, "-")
      |> Enum.map(&(String.to_integer(&1)))
      {min, max, letter, String.trim(pword)}
  end

  def parsable_pwords(filename) do
      read(filename)
      |> to_array
      |> Enum.map(&(process_pword(&1)))
  end

  def divide_passports(filename) do
      read(filename)
      |> String.replace("\r", "")
      |> String.split("\n\n")
      |> Enum.map(fn string -> String.replace(string, "\n", " ") end)
  end
end
