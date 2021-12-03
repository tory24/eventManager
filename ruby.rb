ip_to_domain = { "facebook.com" => "167.67.72.06" }

ip_to_domain["facebook.com"] # "167.67.72.06"

ip_to_domain["facebook.com"] = "8.8.8.8"
# This will change the value of that key

values = { "a" => 1, "b" => 2 }

puts ip_to_domain["facebook.com"]
puts values["a"]