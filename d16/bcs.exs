Code.require_file("../input.ex","#{__ENV__.file}")

defmodule Ticket do

    def depature_product(input_path) do
        {rules, _my_ticket, other_tickets} = organize_input(input_path)
        {_n_tickets, tickets} = other_tickets

        # rules |> IO.inspect
        # _my_ticket |> IO.inspect
        # other_tickets |> IO.inspect


        valid_tickets = valid_ticks(tickets, rules)
        length(valid_tickets) |> IO.inspect
        field_count = length(List.first(valid_tickets))
        # field_count |> IO.inspect
        idxs = 0..field_count - 1

        # col_9 = Enum.map(valid_tickets, fn t -> Enum.at(t,9) end)
        # Enum.each col_9, fn el ->
        #    el |> IO.inspect
        # end
        field_options = Enum.reduce(0..field_count - 1, %{},  fn idx, acc ->
            Map.put(acc, idx, usable_fields(valid_tickets, idx, rules))
        end)

        # field_options |> IO.inspect
        Map.keys(field_options)
        |> Enum.reject(fn idx -> !Enum.any?(field_options[idx], fn field -> String.match?(field, ~r/dep/) end) end)
        |> Enum.reduce(%{}, fn idx, acc -> Map.put(acc, idx, field_options[idx]) end)
        # |> IO.inspect
    end

    def usable_fields(tickets, idx, rules) do
        Enum.reject(Map.keys(rules), fn rule_name ->
            !Enum.all?(tickets, fn ticket -> rules[rule_name].(Enum.at(ticket, idx)) end)
        end)

    end

    def valid_ticks(tickets, rules) do
        Enum.reject(tickets, fn ticket -> ticket_error_rate(ticket, rules) > 0 end)
    end

    def find_scan_error_rate(input_path) do
        {rules, _my_ticket, other_tickets} = organize_input(input_path)
        {_n_tickets, tickets} = other_tickets

        add_error_rates(tickets, rules)
        |> IO.inspect
    end

    def add_error_rates(tickets, rules) do
        Enum.reduce(tickets, 0, fn ticket_vals, acc ->
            ticket_error_rate(ticket_vals, rules) + acc
        end)
    end

    def ticket_error_rate(ticket_vals, rules) do
        Enum.reduce(ticket_vals, 0, fn val, acc ->
            case valid_value?(val, rules) do
                true -> acc
                false -> acc + val
            end
        end)
    end

    def valid_value?(val, rules) do
        Map.values(rules)
        |> Enum.any?(fn rule -> rule.(val) == true end)
    end

    def organize_input(input_path) do
        [rules, y_ticket, n_tickets] = Input.tickets_array(input_path)

        {organize_rules(rules), organize_tickets(y_ticket), organize_tickets(n_tickets)}

    end

    def organize_tickets(tickets) do
        [group | ticks] = String.split(tickets, "\n", trim: true)
        p_ticks = Enum.map(ticks, fn tick_vals ->
            String.split(tick_vals, ",", trim: true)
            |> Enum.map(&(String.to_integer(&1)))
        end)

        {String.replace(group, ":", ""), p_ticks}
    end

    def organize_rules(rules) do
        rules
        |> String.split("\n", trim: true)
        |> Enum.reduce(%{}, fn rule, rulemap ->
            Map.merge(rulemap, define_rule(rule))
        end)
    end

    def define_rule(rule) do
        [rule_name | s_ranges] = String.split(rule, ": ", trim: true)

        [[{min1, max1}, {min2, max2}]] = Enum.map(s_ranges, fn s_range ->
            min_max = String.split(s_range, " or ", trim: true)
            Enum.map(min_max, fn st_min_max ->
                [min, max] = String.split(st_min_max, "-", trim: true)
                {String.to_integer(min), String.to_integer(max)}
            end)
        end)

        %{rule_name => fn (val) -> (val >= min1 and val <= max1) || (val >= min2 and val <= max2)end}
    end
end

# test_path = Path.dirname(__ENV__.file) <> "/example2.txt"
test_path = Path.dirname(__ENV__.file) <> "/input"

Ticket.depature_product(test_path)
# Ticket.find_scan_error_rate(test_path)
# input_path = Path.dirname(__ENV__.file) <> "/input.txt"
# Ticket.depature_product(input_path)
# Ticket.find_scan_error_rate(input_path)
